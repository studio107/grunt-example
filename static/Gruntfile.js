module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            build: {
                src: [
                    'vendor/*.js',
                    'js/*.js'
                ],
                dest: 'build/all.min.js'
            }
        },
        cssmin: {
            combine: {
                files: {
                    'build/all.min.css': ['css/screen.css']
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },
        watch: {
            scripts: {
                files: [
                    'src/*.js'
                ],
                tasks: ['uglify:build']
            },
            vendor: {
                files: 'vendor/**/*.js',
                tasks: ['uglify'],
                options: {
                    event: ['added', 'deleted']
                }
            },
            css: {
                files: ['**/*.sass', '**/*.scss'],
                tasks: ['compass', 'cssmin:combine'],
                options: {
                    livereload: true
                }
            },
            // Watch changes in Gruntfile and reload grunt
            grunt: {
                files: ['Gruntfile.js']
            }
        },
        jshint: {
            all: ['src/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['compass', 'uglify', 'cssmin']);
    grunt.registerTask('jshint', ['jshint']);

    // Run default task when grun start. Really useful with grunt watch by default.
    grunt.task.run('default');
    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });
};
