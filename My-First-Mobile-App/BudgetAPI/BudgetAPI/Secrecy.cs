using System;
using System.Buffers;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace BudgetAPI
{
    public class Secrecy
    {
        private static string _connection = "User Id=postgres;Password=t$3rDmy23;Server=localhost;Port=5432;Database=BudgetDB;";
        public static string hashString(string word)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hValue = Encoding.ASCII.GetBytes(word);
                byte[] result = SHA256.HashData(hValue);
                return Encoding.ASCII.GetString(result);
            }
        }

        public static string getConnection()
        {
            return _connection;
        }
    }
}
