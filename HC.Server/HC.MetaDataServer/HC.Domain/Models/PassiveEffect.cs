using HC.Domain.Enums;

namespace HC.Domain.Models
{
    public class PassiveEffect
    {
        public EffectType EffectTypeName { get; set; }

        public string Name { get; set; }

        public bool IsPercent { get; set; }

        public double Value { get; set; }
    }
}
