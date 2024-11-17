---
title: Using Same Node in Jenkins Groovy Pipeline
url: /using-same-node-in-jenkins-groovy-pipeline
date: 2020-10-25
description: How to make sure the same agent is used throughout a pipeline in Jenkins.
summary: As new to Jenkins, I made a mistake that led to confusing errors. Working with .groovy files in Jenkins shared libraries isn’t the most joyful experience I’ve had in my career, but this makes total sense once I saw the obvious.
tags: [Jenkins]
categories: [Coding]
ogimage: jenkins.png
draft: false  
---

{{<post-image image="jenkins.png" alt="Jenkins build server web UI with big logo" />}}

As new to [Jenkins][1], I made a mistake that led to confusing errors. Working with .groovy files in [_Jenkins shared libraries_][2] isn't the most joyful experience I've had in my career, but this makes total sense once I saw the obvious.

We have bunch of build agents that perform the actual builds in Jenkins (Docker containers running in [Nomad][3]). The initial pipeline defined an _agent_ for every stage, resulting in "random" build failures. Sometimes you would get the same agent in all stages and everything was fine, but other times you would get different agents in a single pipeline (revealed by the build logs). 

This isn't very good when you have stages that depend on state (on the local file system) from the previous stage.

## Bad version

{{<code groovy "linenos=false, hl_lines=4 6 14 34">}}
#!/usr/bin/env groovy
def call(Map config) {
  pipeline {
    agent none    
    stage('Build') {      
      agent {node {label 'nomad-jenkins-agent'}}
      steps {
        script {
          // stuff that changes local folder (workspace)
        }
      }
    }
    stage('Approve') {
      agent {node {label 'jenkins'}}
      timeout(60) { 
        script {
          def approve = input id:'deploy', message: 'Ok to deploy?', ok: 'Ok',
              parameters: [choice(name: 'Select', choices: 'yes\nno', description: 'Deploy?')],
              submitterParameter: 'user'
          env.DEPLOY = "${approve.Select}"
          echo "Selected action: ${env.DEPLOY}"
        }
      }
      script {
        if("${env.DEPLOY}" == 'no'){
          currentBuild.result = 'ABORTED'
        }
      }
    }
    stage('Deploy') {
      when {
        environment name: 'DEPLOY', value: 'yes'        
      }
      agent {node {label 'nomad-jenkins-agent'}}
      steps {
        // trying to use stuff from local folder (workspace)
      }
    }
  }
}
{{</code>}}

By simply defining an agent at the top level, the issues were gone. We can still "override" that value in a stage if needed, like in our _Approve_ step.

## Better version

{{<code groovy "linenos=false, hl_lines=4 13">}}
#!/usr/bin/env groovy
def call(Map config) {
  pipeline {
    agent {node {label 'nomad-jenkins-agent'}}
    stage('Build') {
      steps {
        script {
          // stuff that changes local folder (workspace)
        }
      }
    }
    stage('Approve') {
      agent {node {label 'jenkins'}}
      timeout(60) { 
        script {
          def approve = input id:'deploy', message: 'Ok to deploy?', ok: 'Ok',
              parameters: [choice(name: 'Select', choices: 'yes\nno', description: 'Deploy?')],
              submitterParameter: 'user'
          env.DEPLOY = "${approve.Select}"
          echo "Selected action: ${env.DEPLOY}"
        }
      }
      script {
        if("${env.DEPLOY}" == 'no'){
          currentBuild.result = 'ABORTED'
        }
      }
    }
    stage('Deploy') {
      when {
        environment name: 'DEPLOY', value: 'yes'        
      }
      steps {
        // trying to use stuff from local folder (workspace)
      }
    }
  }
}
{{</code>}}


[1]: https://www.jenkins.io/
[2]: https://www.jenkins.io/doc/book/pipeline/shared-libraries/
[3]: https://www.nomadproject.io/
