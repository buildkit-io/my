/* global angular Project */
angular.module("bkApp").controller('tutorialsController', ['$scope', '$routeParams', '$location',

function($scope, $routeParams, $location) {
    $scope.tutorials = [{
        name: "buildkit-base",
        title: "Base",
        description: "<dt>Base image with Docker.</dt>"+
        "<dd>Fully configured workspace with Docker, Docker Compose and Portainer, "+
        "just add the tools you need and start working on your project. </dd></dl>",
        screenshots: [],
        tools: [{
            icon: "icon-docker",
            background: "bg-aqua",
            title: "Docker"
        }]
    },{
        name: "hackathon",
        title: "Hackathon Starter",
        description: "<dl><dt>A boilerplate for Node.js web applications.</dt>"+
        "<dd>Save the time it takes to get a project started: decide on what to build, "+
        "pick a programming language, pick a web framework, pick a CSS "+
        "framework. Other team members can start contributing immediately.</dd></dl>"+
        "<ul>"+
        "<li><strong>Authentication</strong> using Email and Password, Twitter, Facebook, Google</li>"+
        "<li>Contact Form (powered by Mailgun, Sendgrid or Mandrill)</li>"+
        "<li><strong>Account Management</strong>"+
        "<ul>"+
        "<li>Gravatar, Profile Details</li>"+
        "<li>Change Password, Forgot Password, Reset Password</li>"+
        "<li>Delete Account</li>"+
        "</ul></li>"+
        "<li><strong>API Examples</strong>: Facebook, Foursquare, Last.fm, Tumblr, Twitter and more.</li>"+
        "</ul>",
        screenshots: [{
            url: "demo/hackathon_starter1.jpg",
            title: ""
        },
            {
            url: "demo/hackathon_starter2.png",
            title: "Homepages"
        },
            {
            url: "demo/hackathon_starter3.png",
            title: "MongoDB Compass"
        }],
        tools: [{
            icon: "fa-git",
            background: "btn-github",
            title: "UnGit"
        },
        {
            icon: "fa-code",
            background: "btn-dropbox",
            title: "Code Editor"
        },
        {
            icon: "fa-database",
            background: "btn-success",
            title: "MongoDB Compass"
        }]
    },
    {
        name: "seed",
        title: "Angular 2 Seed Express",
        description: "<dl><dt>Want to feel like a full-stack Angular 2 developer but know only Express?</dt>"+
        "<dd>This is an express seed project for Angular 2 apps based on Minko Gechev's angular2-seed. Include:</dd></dl>"+
        "<ul>"+
        "<li>Full include from <a href=\"https://github.com/mgechev\">Minko Gechev's</a> <a href=\"https://github.com/mgechev/angular2-seed\">angular2-seed</a>.</li>"+
        "<li><a href=\"https://expressjs.com/\">Express</a> Express Node.js server for production/development build API.</li>"+
        "<li><a href=\"http://pm2.keymetrics.io/\">PM2</a> daemon for a server running.</li>"+
        "<li><a href=\"https://github.com/vyakymenko/angular2-nginx-config-example/blob/master/ng2-application.conf\">Nginx</a> configuration file for your server.</li>"+
        "</ul>",
        screenshots: [{
            url: "demo/seed1.jpg",
            title: "Angular2"
        },
        {
            url: "demo/seed2.png",
            title: "Angular CLI"
        }],
        tools: [{
            icon: "fa-database",
            background: "btn-facebook",
            title: "phpMyAdmin"
        },
        {
            icon: "fa-terminal",
            background: "btn-github",
            title: "Shell"
        }]
    }];
}]);
