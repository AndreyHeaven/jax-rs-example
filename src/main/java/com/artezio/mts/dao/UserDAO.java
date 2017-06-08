package com.artezio.mts.dao;

import com.artezio.mts.model.User;

import java.util.Collection;
import java.util.HashMap;

/**
 * Created by araigorodskiy on 08.06.2017.
 */
public class UserDAO {
    private static UserDAO ourInstance = new UserDAO();

    public static UserDAO getInstance() {
        return ourInstance;
    }

    HashMap<String, User> db = new HashMap<String, User>();

    private UserDAO() {
    }

    public User getById(String login) {
        return db.get(login);
    }

    public Collection<User> getAll() {
        return db.values();
    }

    public void delete(String login) {
        db.remove(login);
    }

    public void add(User user) {
        String login = user.getLogin();
        if (db.containsKey(login)) {
            throw new RuntimeException("Пользователь уже существует"); //по идее надо сое исключение
        }
        db.put(login, user);
    }

    public void update(User user) {
        String login = user.getLogin();
        if (!db.containsKey(login)) {
            throw new RuntimeException("Пользователя не существует"); //по идее надо сое исключение
        }
        db.put(login, user);
    }
}
