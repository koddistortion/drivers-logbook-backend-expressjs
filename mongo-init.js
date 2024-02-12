db.createUser({
  user: 'user',
  pwd: 'pass',
  roles: [
    {
      role: 'dbOwner',
      db: 'drivejournal-backend',
    }
  ],
});