pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'Vivek033'
        DOCKERHUB_PASS = credentials('dockerhub-credentials')  // Jenkins secret
        BACKEND_IMAGE = "Vivek033/feedback-backend"
        FRONTEND_IMAGE = "Vivek033/feedback-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Im-VenuM/feedback-app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'docker build -t $BACKEND_IMAGE:latest .'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker build -t $FRONTEND_IMAGE:latest .'
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh """
                echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin
                docker push $BACKEND_IMAGE:latest
                docker push $FRONTEND_IMAGE:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}