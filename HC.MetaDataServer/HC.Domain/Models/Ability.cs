using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;

[FunctionOutput]
public class Ability
{
    [Parameter("uint256", "strength", 1)]
    public BigInteger Strength { get; set; }

    [Parameter("uint256", "speed", 2)]
    public BigInteger Speed { get; set; }

    [Parameter("uint256", "intelligence", 3)]
    public BigInteger Intelligence { get; set; }

    [Parameter("uint256", "endurance", 4)]
    public BigInteger Endurance { get; set; }

    [Parameter("uint256", "magic", 5)]
    public BigInteger Magic { get; set; }
}
