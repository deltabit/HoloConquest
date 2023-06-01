namespace HC.Domain.Models
{
    public class SimpleAbility
    {
        public int Strength { get; set; }
        public int Speed { get; set; }
        public int Intelligence { get; set; }
        public int Endurance { get; set; }
        public int Magic { get; set; }

        public static SimpleAbility CreateRandomAbilityInt()
        {
            Random random = new Random();
            SimpleAbility abilityInt = new SimpleAbility();

            abilityInt.Strength = random.Next(1, 101);
            abilityInt.Speed = random.Next(1, 101);
            abilityInt.Intelligence = random.Next(1, 101);
            abilityInt.Endurance = random.Next(1, 101);
            abilityInt.Magic = random.Next(1, 101);

            return abilityInt;
        }
    }
}
