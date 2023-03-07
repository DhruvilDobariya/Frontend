﻿namespace BookAPI.Repositories
{
    public interface ICRUDRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<int> DeleteAsync(int id);
    }
}
