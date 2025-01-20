const fs = require('fs');
const path = require('path');

const projectDistPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const indexPath = path.join(projectDistPath, 'index.html');
const stylePath = path.join(projectDistPath, 'style.css');

function createProjectDist() {
  return fs.promises.mkdir(projectDistPath, { recursive: true });
}

async function readTemplate() {
  return fs.promises.readFile(templatePath, 'utf-8');
}

async function replaceTemplateTags(template) {
  const componentFiles = await fs.promises.readdir(componentsPath);
  for (const file of componentFiles) {
    const componentName = path.parse(file).name;
    const componentPath = path.join(componentsPath, file);

    const componentContent = await fs.promises.readFile(componentPath, 'utf-8');

    const tag = `{{${componentName}}}`;
    template = template.replace(new RegExp(tag, 'g'), componentContent);
  }
  return template;
}

async function compileStyles() {
  const styleFiles = await fs.promises.readdir(stylesPath);
  const writeStream = fs.createWriteStream(stylePath);

  for (const file of styleFiles) {
    const filePath = path.join(stylesPath, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isFile() && path.extname(file) === '.css') {
      const styleContent = await fs.promises.readFile(filePath, 'utf-8');
      writeStream.write(styleContent + '\n');
    }
  }

  writeStream.end();
}

async function copyAssets() {
  const copyAsset = async (src, dest) => {
    const entries = await fs.promises.readdir(src, { withFileTypes: true });
    await fs.promises.mkdir(dest, { recursive: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyAsset(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  };

  await copyAsset(assetsPath, path.join(projectDistPath, 'assets'));
}

async function buildPage() {
  try {
    await createProjectDist();
    let template = await readTemplate();
    template = await replaceTemplateTags(template);
    await fs.promises.writeFile(indexPath, template);
    await compileStyles();
    await copyAssets();
    console.log('Project built successfully!');
  } catch (error) {
    console.error('Error during build:', error);
  }
}

buildPage();
