namespace HC.Domain.Models
{
    public abstract class AbilityBase
    {
        public string AbilityName { get; set; }

        public string Description { get; set; }

        public string AbilityType { get; set; } // 

        public int Id { get; set; }
    }
}
