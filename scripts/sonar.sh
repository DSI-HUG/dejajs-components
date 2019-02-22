npm i -g sonar-scanner
sonar-scanner -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${SONAR_TOKEN} -Dsonar.organization=hug-dsi -Dsonar.projectKey=dejajs-component -Dsonar.sources=projects