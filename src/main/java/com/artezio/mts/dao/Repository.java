package com.artezio.mts.dao;

/**
 * Репозиторий
 *
 * @author  araigorodskiy
 */
public interface Repository<ID, T> {

    /**
     * Получение записи по login
     *
     * @param id
     * @return сущьность
     */
    public T getById(ID id);

    /**
     * Удаление записи по ID
     *
     * @param id
     */
    void delete(ID id);

    /**
     * Добавление новой записи
     *
     * @param entity
     */
    void add(T entity);

    /**
     * Обновление записи
     *
     * @param entity
     */
    void update(T entity);
}
