using HC.DataAccess;
using HC.Domain.Models;
using HC.BusinessLogic.Services;
using HC.BusinessLogic.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});

builder.Services.AddDbContext<HCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("HCDataBaseMock")));

#region _Services_

builder.Services.Configure<ContractSettings>(builder.Configuration.GetSection("Contract"));
builder.Services.Configure<BlockchainSettings>(builder.Configuration.GetSection("Ganache"));

builder.Services.AddScoped<IGameItemService, GameItemService>();

#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
