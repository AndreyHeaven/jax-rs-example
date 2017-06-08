package com.artezio.mts.dao;

import com.artezio.mts.model.User;

import java.util.*;

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
        User user = new User();
        user.setLogin("login1");
        user.setBirthday(new Date());
        user.setGender(Boolean.TRUE);
        user.setDisplayName("User User 1");
        user.setPassword("password1");
        db.put(user.getLogin(),user);
    }

    public User getById(String login) {
        return db.get(login);
    }

    public List<User> getAll() {
        return new ArrayList<User>(db.values());
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
