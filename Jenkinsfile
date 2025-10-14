pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Code Quality: Lint HTML/CSS/JS') {
            steps {
                echo '🔍 Checking code quality...'

                // Install linters (if not already installed)
                sh '''
                npm install -g htmlhint stylelint eslint
                '''

                // Lint HTML files
                sh 'htmlhint . || true'

                // Lint CSS files
                sh 'stylelint "**/*.css" || true'

                // Lint JS files
                sh 'eslint . || true'
            }
        }

        stage('Archive Website') {
            steps {
                echo '📦 Archiving built website...'
                archiveArtifacts artifacts: '**/*.html, **/*.css, **/*.js', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
