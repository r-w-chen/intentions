"""empty message

Revision ID: f25d74a50ec4
Revises: 31d231a04036
Create Date: 2021-07-09 11:15:24.777289

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f25d74a50ec4'
down_revision = '31d231a04036'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('todo_exercises_session_exercise_id_fkey', 'todo_exercises', type_='foreignkey')
    op.create_foreign_key(None, 'todo_exercises', 'session_exercise', ['session_exercise_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'todo_exercises', type_='foreignkey')
    op.create_foreign_key('todo_exercises_session_exercise_id_fkey', 'todo_exercises', 'todo_sessions', ['session_exercise_id'], ['id'])
    # ### end Alembic commands ###
