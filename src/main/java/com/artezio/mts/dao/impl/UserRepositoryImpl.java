package com.artezio.mts.dao.impl;

import com.artezio.mts.dao.UserRepository;
import com.artezio.mts.dao.UserExistsException;
import com.artezio.mts.model.User;

import java.util.*;

/**
 * Хранилище пользователей в памяти
 * <p>
 * Created by araigorodskiy on 08.06.2017.
 */
public class UserRepositoryImpl implements UserRepository {
    private static UserRepositoryImpl ourInstance = new UserRepositoryImpl();

    public static UserRepositoryImpl getInstance() {
        return ourInstance;
    }

    private Map<String, User> db = Collections.synchronizedMap(new HashMap<String, User>());

    private UserRepositoryImpl() {
        User user = new User();
        user.setId(0L);
        user.setLogin("login1");
        user.setBirthday(new Date());
        user.setGender(Boolean.TRUE);
        user.setDisplayName("User User 1");
        user.setPassword("password1");
        db.put(user.getLogin(), user);

        user = new User();
        user.setId(1L);
        user.setLogin("login2");
        user.setBirthday(new Date());
        user.setGender(Boolean.FALSE);
        user.setDisplayName("User User 2");
        user.setPassword("password2");
        db.put(user.getLogin(), user);
    }

    /**
     * Получение записи по login
     *
     * @param login
     * @return
     */
    @Override
    public User getById(String login) {
        return db.get(login);
    }

    /**
     * Получение всех записей
     *
     * @return
     */
    @Override
    public List<User> getAll() {
        return new ArrayList<>(db.values());
    }

    /**
     * Удаление записи по login
     *
     * @param login
     */
    @Override
    public void delete(String login) {
        db.remove(login);
    }

    /**
     * Добавление новой записи
     *
     * @param user
     */
    @Override
    public void add(User user) {
        String login = user.getLogin();
        if (hasUser(user)) {
            throw new UserExistsException("Пользователь уже существует");
        }
        user.setId(generateKey());
        db.put(login, user);
    }

    /**
     * Обновление записи
     *
     * @param user
     */
    @Override
    public void update(User user) {
        String login = user.getLogin();
        if (hasUser(user)) {
            throw new UserExistsException("Пользователь уже существует");
        }
        db.put(login, user);
    }

    /**
     * Есть ли другой пользователь с таким же login
     *
     * @param user
     * @return
     */
    private boolean hasUser(User user) {
        boolean hasUser;
        if (user.getId() == null) {
            hasUser = db.containsKey(user.getLogin());
        } else {
            User sameUser = db.get(user.getLogin());
            hasUser = (sameUser != null && sameUser.getId().compareTo(user.getId()) != 0);
        }
        return hasUser;
    }

    /**
     * Генерация id инкрементально
     *
     * @return id
     */
    private Long generateKey() {
        Collection<User> vals = db.values();
        Long max = Collections.max(vals, new Comparator<User>() {
            @Override
            public int compare(User o1, User o2) {
                return o1.getId().compareTo(o2.getId());
            }
        }).getId();
        return max + 1L;
    }
}
