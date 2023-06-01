using HC.Domain.Models;
using System.Numerics;

namespace HC.BusinessLogic.Mapper
{
    public static class AbilityMapper
    {
        public static SimpleAbility MapToSimpleAbility(Ability ability)
        {
            SimpleAbility abilityInt = new SimpleAbility();

            abilityInt.Strength = (int)ability.Strength;
            abilityInt.Speed = (int)ability.Speed;
            abilityInt.Intelligence = (int)ability.Intelligence;
            abilityInt.Endurance = (int)ability.Endurance;
            abilityInt.Magic = (int)ability.Magic;

            return abilityInt;
        }

        public static Ability MapToAbility(SimpleAbility abilityInt)
        {
            Ability ability = new Ability();

            ability.Strength = new BigInteger(abilityInt.Strength);
            ability.Speed = new BigInteger(abilityInt.Speed);
            ability.Intelligence = new BigInteger(abilityInt.Intelligence);
            ability.Endurance = new BigInteger(abilityInt.Endurance);
            ability.Magic = new BigInteger(abilityInt.Magic);

            return ability;
        }
    }

}
