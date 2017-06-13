package com.artezio.mts.dao;

import com.artezio.mts.model.User;

import java.util.List;

/**
 * Репозиторий
 *
 * @author  araigorodskiy
 */
public interface UserRepository extends Repository<String, User> {
    /**
     * Получение всех записей
     *
     * @return
     */
    List<User> getAll();
}
