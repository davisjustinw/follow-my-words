namespace :qdb do
  task :r do
    puts 'Dropping'
    Rake::Task["db:drop"].execute

    puts 'Creating'
    Rake::Task["db:create"].execute

    puts 'Migrating'
    Rake::Task["db:migrate"].execute

    puts 'Seeding'
    Rake::Task["db:seed"].execute
  end
end
