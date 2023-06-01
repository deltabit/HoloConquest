using Microsoft.EntityFrameworkCore;

namespace HC.DataAccess
{
    public class HCContext : DbContext
    {
        public HCContext(DbContextOptions<HCContext> options)
        : base(options)
        {
        }

        //TODO: add DBSet's here
    }
}