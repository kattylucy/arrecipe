"""Initial migration

Revision ID: 51844cb81ae8
Revises: 
Create Date: 2023-04-28 10:05:47.584015

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '51844cb81ae8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipe_tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('recipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('calories_count', sa.Integer(), nullable=False),
    sa.Column('cooking_time', sa.Integer(), nullable=False),
    sa.Column('url', sa.Text(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.Column('thumbnail', sa.LargeBinary(), nullable=True),
    sa.ForeignKeyConstraint(['tag_id'], ['recipe_tags.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipe')
    op.drop_table('recipe_tags')
    # ### end Alembic commands ###