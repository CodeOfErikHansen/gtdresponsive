use productivitydb;
INSERT INTO status(description, name)
VALUES
        ('This status is for stuff that needs to be organized', 'Inbox'),
       ('This status is for stuff, next actions, and projects that are completed', 'Complete'),
       ('This status is for stuff, next actions, records, and projects that are trashed', 'Trashed'),
       ('This status is for an ongoing project', 'On Deck'),
       ('This status is for a someday project', 'Someday'),
       ('This status is for a record', 'Archive'),
       ('This status is for a ball in someone else\'s court', 'Delegated')
       ;
