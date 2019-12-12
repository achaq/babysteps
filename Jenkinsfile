version = ''

pipeline {

    environment {
        registry = "docker-registry.leyton.com:5000"
    }

    agent any

    tools {
        nodejs "Node 12.9.1"
    }

    stages {

        stage('Build') {
            steps {
                sh '''
                echo "Build angular - Begin"
                npm i -s
                npm run build --prod
                echo "Build angular - End"
                '''
            }
        }

        stage('Building frontend image') {
            steps {
                script {
                    version = sh(returnStdout: true, script: 'jq -r \'.version\' package.json');
                    env.VERSION = version.trim();
                    sh 'printenv | grep VERSION';
                    currentBuild.description = "pdf-anonyme-front:${VERSION}-${BUILD_NUMBER}";
                }
                sh '''
                echo "Building image - Begin"
                sudo docker build -t pdf-anonyme-front:${VERSION}-${BUILD_NUMBER} .
                sudo docker tag pdf-anonyme-front:${VERSION}-${BUILD_NUMBER} ${registry}/pdf-anonyme/pdf-anonyme-front:${VERSION}-${BUILD_NUMBER}
                echo "Building image - End"
                '''
            }
        }

        stage('Push to Registry') {
            steps {
                sh '''
                echo "Push to Registry - Begin"
                sudo docker push ${registry}/pdf-anonyme/pdf-anonyme-front:${VERSION}-${BUILD_NUMBER}
                echo "Push to Registry - End"
                '''
            }
        }

        stage('Remove Unused docker image') {
            steps {
                sh '''
                echo "Remove Unused docker image - Begin"
                sudo docker rmi -f $(sudo docker images --filter=reference="*${VERSION}-${BUILD_NUMBER}*" -q)
                echo "Remove Unused docker image - End"
                '''
            }
        }

    }

     post {
            always {
                echo 'One way or another, I have finished'
                deleteDir() /* clean up our workspace */
            }
            success {
                echo 'I succeeeded!'
            }
            unstable {
                echo 'I am unstable :/'
            }
            failure {
                echo 'I failed :('
            }

        }

}
