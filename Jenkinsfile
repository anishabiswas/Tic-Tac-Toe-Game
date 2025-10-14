pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/anishabiswas/Tic-Tac-Toe-Game'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing npm packages...'
                sh '''
                # Initialize npm if package.json does not exist
                if [ ! -f package.json ]; then
                  npm init -y
                fi

                # Install dependencies locally (no -g)
                npm install --save-dev htmlhint stylelint stylelint-config-standard eslint@8
                '''
            }
        }

        stage('Lint HTML/CSS/JS') {
            steps {
                echo '🔍 Running linters...'

                sh '''
                # HTML lint
                npx htmlhint .

                # Stylelint with auto-fix
                npx stylelint "**/*.css" --fix

                # ESLint (v8) with auto-fix
                npx eslint . --fix
                '''
            }
        }

        stage('Archive Website') {
            steps {
                echo '📦 Archiving project files...'
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
