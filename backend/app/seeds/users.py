from ..models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from ..constants import pronouns


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', birthday="11/11/1993", banner_color="#FAFAFA", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', birthday="01/11/1994", banner_color="#C0C0C0", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', birthday="12/11/1997", banner_color="#808080", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    kai = User(
        username='kai', email='kai@aa.io', password='password', birthday="05/11/1992", banner_color="#808000", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    eliana = User(
        username='eliana', email='eliana@aa.io', password='password', birthday="03/11/1994", banner_color="#800000", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )
    jayden = User(
        username='jayden', email='jayden@aa.io', password='password', birthday="06/11/1988", banner_color="#00FF00 ", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    ezra = User(
        username='ezra', email='ezra@aa.io', password='password', birthday="09/11/1995", banner_color="#00FFFF", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    luca = User(
        username='luca', email='luca@aa.io', password='password', birthday="03/11/1999", banner_color="#008080", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )
    rowan = User(
        username='rowan', email='rowan@aa.io', password='password', birthday="08/11/2000", banner_color="#000080", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    nova = User(
        username='nova', email='nova@aa.io', password='password', birthday="11/11/1996", banner_color="#FF00FF", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    amara = User(
        username='amara', email='amara@aa.io', password='password', birthday="10/11/2001", banner_color="#800080", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    aaliyah = User(
        username='aaliyah', email='aaliyah@aa.io', password='password', birthday="01/11/2004", banner_color="#CD5C5C", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )
    finn = User(
        username='finn', email='finn@aa.io', password='password', birthday="04/11/2003", banner_color="#F08080", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    zion = User(
        username='zion', email='zion@aa.io', password='password', birthday="03/11/1987", banner_color="#FA8072", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    maeve = User(
        username='maeve', email='maeve@aa.io', password='password', birthday="07/11/1996", banner_color="#E9967A", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )
    kayden = User(
        username='kayden', email='kayden@aa.io', password='password', birthday="11/11/2002", banner_color="#00FF7F", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    mia = User(
        username='mia', email='mia@aa.io', password='password', birthday="12/11/1996", banner_color="#EEE8AA", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    mila = User(
        username='mila', email='mia2@aa.io', password='password', birthday="10/11/2001", banner_color="#FFFFE0", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )
    aurora = User(
        username='aurora', email='aurora@aa.io', password='password', birthday="08/11/1997", banner_color="#00BFFF", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    alina = User(
        username='alina', email='alina@aa.io', password='password', birthday="07/11/2000", banner_color="#FF4500", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    remi = User(
        username='remi', email='remi@aa.io', password='password', birthday="06/11/1999", banner_color="#98FB98", bio="this is a test...", pronouns=pronouns[0], avatar='test.png'
    )
    amaya = User(
        username='amaya', email='amaya@aa.io', password='password', birthday="04/11/2000", banner_color="#DEB887", bio="this is a test...", pronouns=pronouns[1], avatar='test.png'
    )
    ari = User(
        username='ari', email='ari@aa.io', password='password', birthday="03/11/1992", banner_color="#4682B4", bio="this is a test...", pronouns=pronouns[2], avatar='test.png'
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kai)
    db.session.add(eliana)
    db.session.add(jayden)
    db.session.add(ezra)
    db.session.add(luca)
    db.session.add(rowan)
    db.session.add(nova)
    db.session.add(amara)
    db.session.add(aaliyah)
    db.session.add(finn)
    db.session.add(zion)
    db.session.add(maeve)
    db.session.add(kayden)
    db.session.add(mia)
    db.session.add(mila)
    db.session.add(aurora)
    db.session.add(alina)
    db.session.add(remi)
    db.session.add(amaya)
    db.session.add(ari)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
