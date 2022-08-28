from typing import Any
from django.db import models


class LocationsField(models.TextField):
    def __init__(self, *args, **kwargs) -> None:
        self.separator = kwargs.pop("separator", ",")
        super(LocationsField, self).__init__(*args, **kwargs)

    def to_python(self, value: Any) -> Any:
        if not value:
            return
        if isinstance(value, list):
            return value
        return value.split(self.separator)

    def get_db_prep_value(self, value: list | tuple, *args, **kwargs) -> Any:
        if not value:
            return
        assert isinstance(value, list) or isinstance(value, tuple)
        return self.separator.join(value)

    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)
