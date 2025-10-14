pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/anishabiswas/Tic-Tac-Toe-Game'
            }
        }

        stage('Install & Lint') {
            steps {
                echo '🔍 Installing dependencies and running linters...'
                sh '''
                # Initialize npm only if package.json doesn't exist
                if [ ! -f package.json ]; then
                  npm init -y
                fi

                # Install tools locally inside the workspace (no -g, no root needed)
                npm install --save-dev htmlhint stylelint stylelint-config-standard eslint

                # Run linters using npx
                npx htmlhint .
                npx stylelint "**/*.css"
                npx eslint .
                '''
            }
        }

        stage('Archive Website') {
            steps {
                echo '📦 Archiving static site files...'
                archiveArtifacts artifacts: '**/*', fingerprint: true
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
