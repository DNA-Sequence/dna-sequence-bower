'use strict';

module.exports = function (grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time at the end
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed MIT */\n',

        clean: {
            files: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: [
                    'src/<%= pkg.name %>.js',
                    'src/dna/beans/enuns.js',
                    'src/dna/beans/InputAlign.js',
                    'src/dna/beans/InputAlignGlobalLocal.js',
                    'src/dna/beans/InputResultAlign.js',
                    'src/dna/beans/Matrix.js',
                    'src/dna/beans/Node.js',
                    'src/dna/beans/NodeDetail.js',
                    'src/dna/beans/OutputAlign.js',
                    'src/dna/beans/OutputResultAlign.js',
                    'src/dna/util/StringBuffer.js',
                    'src/dna/formulas/Calculation.js',
                    'src/dna/formulas/AbstractCalculation.js',
                    'src/dna/formulas/CalculationFactory.js',
                    'src/dna/formulas/CalculationGlobal.js',
                    'src/dna/formulas/CalculationSemiGlobal.js',
                    'src/dna/formulas/CalculationLocal.js',
                    'src/dna/formulas/NodeController.js',
                    'src/dna/formulas/OrganizeNode.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            all: {
                options: {
                    urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: [
                    'src/<%= pkg.name %>.js',
                    'src/dna/beans/enuns.js',
                    'src/dna/beans/InputAlign.js',
                    'src/dna/beans/InputAlignGlobalLocal.js',
                    'src/dna/beans/InputResultAlign.js',
                    'src/dna/beans/Matrix.js',
                    'src/dna/beans/Node.js',
                    'src/dna/beans/NodeDetail.js',
                    'src/dna/beans/OutputAlign.js',
                    'src/dna/beans/OutputResultAlign.js',
                    'src/dna/util/StringBuffer.js',
                    'src/dna/formulas/Calculation.js',
                    'src/dna/formulas/AbstractCalculation.js',
                    'src/dna/formulas/CalculationFactory.js',
                    'src/dna/formulas/CalculationGlobal.js',
                    'src/dna/formulas/CalculationSemiGlobal.js',
                    'src/dna/formulas/CalculationLocal.js',
                    'src/dna/formulas/NodeController.js',
                    'src/dna/formulas/OrganizeNode.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        connect: {
            server: {
                options: {
                    hostname: '*',
                    port: 9000
                }
            }
        },
        jsdoc: {
            dist: {
                src: [
                    'src/<%= pkg.name %>.js',
                    'src/dna/beans/enuns.js',
                    'src/dna/beans/InputAlign.js',
                    'src/dna/beans/InputAlignGlobalLocal.js',
                    'src/dna/beans/InputResultAlign.js',
                    'src/dna/beans/Matrix.js',
                    'src/dna/beans/Node.js',
                    'src/dna/beans/NodeDetail.js',
                    'src/dna/beans/OutputAlign.js',
                    'src/dna/beans/OutputResultAlign.js',
                    'src/dna/util/StringBuffer.js',
                    'src/dna/formulas/Calculation.js',
                    'src/dna/formulas/AbstractCalculation.js',
                    'src/dna/formulas/CalculationFactory.js',
                    'src/dna/formulas/CalculationGlobal.js',
                    'src/dna/formulas/CalculationSemiGlobal.js',
                    'src/dna/formulas/CalculationLocal.js',
                    'src/dna/formulas/NodeController.js',
                    'src/dna/formulas/OrganizeNode.js'
                ],
                options: {
                    destination: 'doc'
                }
            }
        },
        sonarRunner: {
            analysis: {
                options: {
                    debug: true,
                    separator: '\n',
                    sonar: {
                        host: {
                            url: 'http://localhost:9000'
                        },
                        jdbc: {
                            driver : 'org.postgresql.Driver',
                            url: 'jdbc:postgresql://localhost/sonar',
                            username: 'postgres',
                            password: 'sonar'
                        },

                        projectKey: 'sonar:grunt-sonar-runner:0.1.0',
                        projectName: 'DNA-Bower',
                        projectVersion: '0.10',
                        sources: ['src'].join(','),
                        language: 'js',
                        sourceEncoding: 'UTF-8'
                    }
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'clean', 'concat', 'uglify']);
    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });
    grunt.registerTask('serve', ['connect', 'watch']);
    grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

    grunt.registerTask('sonar', ['sonarRunner']);

};
