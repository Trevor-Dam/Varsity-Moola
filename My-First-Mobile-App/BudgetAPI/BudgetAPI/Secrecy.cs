using Isopoh.Cryptography.Argon2;
using Microsoft.AspNetCore.Mvc;
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
            string hash = Argon2.Hash(word, 3, 65536, 1, Argon2Type.DataIndependentAddressing, 32);
            return hash; 
           
        }

        

        public static bool verifyPassword(string password, string? passwordToVerify)
        {
           return Argon2.Verify(passwordToVerify, Encoding.UTF8.GetBytes(password));
        }

        public static string getConnection()
        {
            return _connection;
        }
    }
}
