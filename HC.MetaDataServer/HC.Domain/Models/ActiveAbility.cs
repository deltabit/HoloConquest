namespace HC.Domain.Models
{
    public class ActiveAbility : AbilityBase
    {
        public string DamageType { get; set; } // Magic | Physick

        public int AoeRadius { get; set; }

        public int ManaCost { get; set; }

        public double Cooldown { get; set; }

        public string CastType { get; set; } // target | nontarget

        public int CastRange { get; set; }

        public int? BonusDamage { get; set; } // bonus in % by user profile (not in smart contract)

        public int StunDuration { get; set; }

        public int DamageValue { get; set; }
    }
}
