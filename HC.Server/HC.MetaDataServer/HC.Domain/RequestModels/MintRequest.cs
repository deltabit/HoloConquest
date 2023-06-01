using System.Numerics;

namespace HC.Domain.RequestModels
{
    public class MintRequest
    {
        public BigInteger Strength { get; set; }
        public BigInteger Speed { get; set; }
        public BigInteger Intelligence { get; set; }
        public BigInteger Endurance { get; set; }
        public BigInteger Magic { get; set; }
        public string TokenURI { get; set; }
    }
}
