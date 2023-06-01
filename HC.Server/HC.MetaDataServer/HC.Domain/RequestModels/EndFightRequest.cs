using System.Numerics;

namespace HC.Domain.RequestModels
{
    public class EndFightRequest
    {
        public BigInteger FightId { get; set; }
        public BigInteger WinnerTokenId { get; set; }
    }
}
