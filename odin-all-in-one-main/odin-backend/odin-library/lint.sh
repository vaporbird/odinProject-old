echo -e '\e[91m Default option sequence: \e[39m'
echo -e '\e[91m Enforce \e[39m'
echo -e '\e[91m JS Modules \e[39m'
echo -e '\e[91m NO Frameworks \e[39m'
echo -e '\e[91m NO TypeScript \e[39m'
echo -e '\e[91m Browser \e[39m'
echo -e '\e[91m Use popular style -> Airbnb \e[39m'
npx eslint --init

echo -e '\e[91m Alter eslint.json \e[39m'
echo { > eslint.json
echo  \"root\": true, >> eslint.json
echo  \"env\": { >> eslint.json
echo    \"browser\": true, >> eslint.json
echo    \"es2021\": true >> eslint.json
echo  }, >> eslint.json
echo  \"extends\": [\"airbnb-base\", \"prettier\"], >> eslint.json
echo  \"overrides\": [], >> eslint.json
echo  \"parserOptions\": { >> eslint.json
echo    \"ecmaVersion\": \"latest\", >> eslint.json
echo    \"sourceType\": \"module\" >> eslint.json
echo  }, >> eslint.json
echo  \"rules\": {}, >> eslint.json
echo  \"ignorePatterns\": [\"node_modules\", \"/public/**\", \"/resources/**\"] >> eslint.json
echo } >> eslint.json

echo -e '\e[91m Create .prettierrc.json \e[39m'
touch .prettierrc.json

echo { > .prettierrc.json
echo  \"singleQuote\": true, >> .prettierrc.json
echo  \"overrides\": [ >> .prettierrc.json
echo    { >> .prettierrc.json
echo      \"files\": [\"*.html\", \"*.css\", \"*.scss\", \"*.sass\", \"*.less\"], >> .prettierrc.json
echo      \"options\": { >> .prettierrc.json
echo        \"singleQuote\": false >> .prettierrc.json
echo      } >> .prettierrc.json
echo    } >> .prettierrc.json
echo  ] >> .prettierrc.json
echo } >> .prettierrc.json

echo -e '\e[91m Create .prettierignore \e[39m'
touch .prettierignore

echo \#node files is ignored by default >> .prettierignore
echo \# files prettier should not touch here >> .prettierignore
echo /public/** >> .prettierignore
echo /resources/** >> .prettierignore

echo -e '\e[91m Alter package.json \e[39m'

echo { > package.json
echo   \"name\": \"odin-library\", >> package.json
echo   \"version\": \"1.0.0\", >> package.json
echo   \"description\": \"\", >> package.json
echo   \"main\": \"script.js\", >> package.json
echo   \"scripts\": { >> package.json
echo     \"test\": \"echo \\"Error: no test specified\\" && exit 1\", >> package.json
echo     \"lint\": \"npm run lint:eslint && npm run lint:prettier\", >> package.json
echo     \"lint:eslint\": \"eslint --fix .\", >> package.json
echo     \"lint:prettier\": \"prettier --write .\" >> package.json
echo   }, >> package.json
echo   \"author\": \"\", >> package.json
echo   \"license\": \"ISC\", >> package.json
echo   \"dependencies\": { >> package.json
echo     \"prettier\": \"^2.8.8\" >> package.json
echo   }, >> package.json
echo   \"devDependencies\": { >> package.json
echo     \"eslint\": \"^8.39.0\", >> package.json
echo     \"eslint-config-airbnb-base\": \"^15.0.0\", >> package.json
echo     \"eslint-plugin-import\": \"^2.27.5\" >> package.json
echo   } >> package.json
echo } >> package.json

