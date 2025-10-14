pipeline {
    agent any

    environment {
        GITHUB_TOKEN = credentials('github-token')
        GITHUB_REPO = 'https://github.com/anishabiswas/Tic-Tac-Toe-Game'
        DEPLOY_BRANCH = 'gh-pages'  // Production branch for static hosting
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: env.GITHUB_REPO
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing npm packages...'
                sh '''
                if [ ! -f package.json ]; then
                  npm init -y
                fi
                npm install --save-dev htmlhint stylelint stylelint-config-standard eslint@8
                '''
            }
        }

        stage('Lint & Fix Code') {
            steps {
                echo '🔍 Running linters...'
                sh '''
                npx htmlhint .
                npx stylelint "**/*.css" --fix
                npx eslint . --fix
                '''
            }
        }

        stage('Build') {
            steps {
                echo '🏗️ Creating build artifact...'
                sh '''
                # For simple HTML/CSS/JS, just copy files to dist folder
                rm -rf dist
                mkdir dist
                cp -r *.html *.css *.js dist/
                '''
            }
        }

        stage('Archive Artifact') {
            steps {
                echo '📦 Archiving the build artifact...'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy to Production') {
            steps {
                echo '🚀 Deploying build artifact...'
                sh '''
                cd dist
                git init
                git checkout -b ${DEPLOY_BRANCH}

                 # Set Git author for this repository
                git config user.name "anisha"
                git config user.email "a27bong@gmail.com"

                git add .
                git commit -m "Deploy production build from Jenkins"
                git remote add origin https://${GITHUB_TOKEN}@github.com/anishabiswas/Tic-Tac-Toe-Game
                git push -f origin ${DEPLOY_BRANCH}
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed and deployed to production!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
