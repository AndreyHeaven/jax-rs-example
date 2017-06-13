package com.artezio.mts.dao;

import com.artezio.mts.model.User;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by araigorodskiy on 13.06.2017.
 */
public interface UserDAO extends DAO<String, User> {
    /**
     * Получение всех записей
     *
     * @return
     */
    List<User> getAll();
}
