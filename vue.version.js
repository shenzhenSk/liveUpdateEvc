import path from 'path';
import fs from 'fs-extra';
import timestamp from 'time-stamp';

const NODE_ENV = (process.env.NODE_ENV || '').trim();
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const paths = {
  dotenv: resolveApp('.env'),
  gitConfig: resolveApp('.git'),
  appPath: resolveApp('.'),
  appBuildDist: resolveApp(process.env.BUILD_PATH || 'dist'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  versionPath: '/config/constant',
};
console.log('NODE_ENV', NODE_ENV);

// 同步文件
function copyPublicFolder() {
  // 同步给dist
  console.log('paths.appBuildDist,paths.appBuildDist', paths.appBuildDist);
  console.log('fs.exists(paths.appPublic)', fs.exists(paths.appPublic));
  fs.exists(paths.appPublic).then((exist) => {
    if (exist) {
      fs.ensureDir(paths.appBuildDist, (err) => {
        console.log(err);
        fs.copySync(paths.appPublic, paths.appBuildDist, {
          dereference: true,
          filter: (file) => file !== paths.appHtml,
        });
      });
    }
  });
  // fs.ensureDir(paths.appBuildDist, (err) => {
  //   console.log(err);
  //   fs.copySync(paths.appPublic, paths.appBuildDist, {
  //     dereference: true,
  //     filter: (file) => file !== paths.appHtml,
  //   });
  // });
}

// 同步版本文件
function updateVersion() {
  const versionTemplateFilePath = paths.appSrc + paths.versionPath + '/version_template.js';
  fs.ensureFile(versionTemplateFilePath, () => {
    let versionText = fs.readFileSync(versionTemplateFilePath, 'utf-8').trim();
    // 如果模板文件空白，则写入下面的串
    if (versionText === '') {
      let defaultVersionText = 'const config = {\n';
      defaultVersionText += '  // 版本\n';
      defaultVersionText += "  versionForAPP: '{version_code_app}',\n";
      defaultVersionText += "  versionForWeb: '{version_code_web}',\n";
      defaultVersionText += '};\n';
      defaultVersionText += '\n';
      defaultVersionText += 'export default config;\n';
      versionText = defaultVersionText;
      fs.writeFileSync(versionTemplateFilePath, defaultVersionText);
    }
    versionText = versionText
      .replace(/{version_code_app}/gi, timestamp('MMDD'))
      .replace(/{version_code_web}/gi, timestamp('YY.MM.DD'));
    fs.writeFileSync(paths.appSrc + paths.versionPath + '/version.js', versionText);
  });

  // 获取Git Head信息
  const gitHeadPath = paths.gitConfig + '/HEAD';
  let finallyVersion = `Build at ${timestamp('YYYY-MM-DD HH:mm:ss')},based on `;
  fs.pathExists(gitHeadPath, (err, exists) => {
    console.log('.git exists', exists);
    if (exists) {
      // 分支
      const gitHead = fs.readFileSync(gitHeadPath, 'utf-8').trim();
      console.log('gitHead', gitHead);
      const arr = (gitHead || '').split('/');
      const gitBranch = arr && arr.length ? arr[arr.length - 1] : '';
      if (gitBranch) {
        finallyVersion += gitBranch;
      }

      // 版本
      const ref = gitHead.split(': ');
      let gitVersion = '';
      const gitVersionPath = '.git/' + ref[1];
      // pathExists为异步
      new Promise((resolve, _reject) => {
        if (ref && ref[1]) {
          fs.pathExists(gitVersionPath, (err, exists) => {
            console.log('git branch exists', exists);
            if (exists) {
              gitVersion = fs.readFileSync('.git/' + ref[1], 'utf-8').trim();
              console.log('gitVersion', gitVersion);
              if (gitVersion) {
                finallyVersion += gitVersion ? '->' + gitVersion : '';
              }
            }
            resolve(null);
          });
        } else {
          resolve(null);
        }
      }).then(() => {
        console.log(finallyVersion);
        fs.writeFileSync(
          paths.appPath + '/.env.production',
          `VITE_APP_VERSION="${finallyVersion}"`,
        );
      });
    }
  });
}
copyPublicFolder();
updateVersion();
