using System.Numerics;

namespace HC.Domain.RequestModels
{
    public class ApproveBatchRequest
    {
        public BigInteger[] TokenIds { get; set; }
    }
}
