package com.artezio.mts.dao;

/**
 * Исключение: пользователь уже существует
 *
 * @author vtroyanov
 */
public class UserExistsException extends RuntimeException {

    public UserExistsException(String message) {
       super(message);
    }

}
