namespace BudgetAPI
{
    public class OutputData<T>
    {
        public OutputData(T data)
        {
            Data = data;
        }

        public T Data { get; set; }
    }
}
