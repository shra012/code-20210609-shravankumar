import json
import random
from random import randint
import enum


class RandomGender(enum.EnumMeta):
    @property
    def RANDOM(self):
        return random.choice([Gender.MALE, Gender.FEMALE])


class Gender(enum.Enum, metaclass=RandomGender):
    FEMALE = 'Female'
    MALE = 'Male'


if(__name__ == "__main__"):
    output = []
    for _ in range(1000000):
        single_vital_statistic = {'Gender': Gender.RANDOM.value, 'HeightCM': randint(
            140, 200), 'WeightKg': randint(50, 130)}
        output.append(single_vital_statistic)

    with open('src/resources/one-million-input-1.json', 'w') as convert_file:
        convert_file.write(json.dumps(output))
