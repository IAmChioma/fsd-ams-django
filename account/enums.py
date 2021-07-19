class AccountStatus:
    PENDING = 'pending'
    OPENED = 'opened'
    CLOSED = 'closed'
    SUSPENDED = 'suspended'
    DELETED = 'deleted'

    CHOICES = (
        (PENDING, PENDING),
        (OPENED, OPENED),
        (CLOSED, CLOSED),
        (SUSPENDED, SUSPENDED),
        (DELETED, DELETED),
    )