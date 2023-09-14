using DynamicTableLearn.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System.Data;

namespace DynamicTableLearn.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LogController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetLogTable()
        {
            DataTable dataSet = new DataTable();
            using (var objConnection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var objCommand = objConnection.CreateCommand();
                objCommand.CommandText = "GetLogTableName";
                objCommand.CommandType = CommandType.StoredProcedure;
                await objConnection.OpenAsync();
                var objAdapter = new MySqlDataAdapter(objCommand);
                await objAdapter.FillAsync(dataSet);
                await objConnection.CloseAsync();
            }
            return Ok(JsonConvert.SerializeObject(dataSet,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    }));
        }

        [HttpPost]
        public async Task<IActionResult> GetLogData(RequestModel request)
        {
            ResponseModel response = new ResponseModel();
            using (var objConnection = new MySqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                DataSet dataSet = new DataSet();
                var objCommand = objConnection.CreateCommand();
                objCommand.CommandText = "DynamicSearchWithPagination";
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.Parameters.AddWithValue("p_tableName", request.TableName);
                objCommand.Parameters.AddWithValue("p_keyword", request.Keyword);
                objCommand.Parameters.AddWithValue("p_sort", request.Sort);
                objCommand.Parameters.AddWithValue("p_take", request.Take);
                objCommand.Parameters.AddWithValue("p_skip", request.Skip);
                await objConnection.OpenAsync();
                var objAdapter = new MySqlDataAdapter(objCommand);
                await objAdapter.FillAsync(dataSet);
                await objConnection.CloseAsync();
                response.Data = dataSet.Tables[0];
                response.Count = (long)dataSet.Tables[1].Rows[0][0];
            }
            return Ok(JsonConvert.SerializeObject(response,
                    new JsonSerializerSettings()
                    {
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    }));
        }
    }
}
