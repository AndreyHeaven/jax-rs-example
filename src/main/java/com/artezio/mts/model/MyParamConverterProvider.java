package com.artezio.mts.model;

import javax.ws.rs.ext.ParamConverter;
import javax.ws.rs.ext.ParamConverterProvider;
import javax.ws.rs.ext.Provider;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.util.Date;

/**
 * Created by araigorodskiy on 09.06.2017.
 */
@Provider
public class MyParamConverterProvider implements ParamConverterProvider {

    public <T> ParamConverter<T> getConverter(Class<T> rawType, Type genericType, Annotation[] annotations) {
        if(rawType.equals(Date.class)){
            return (ParamConverter<T>) new DateParamConverter();
        }
        return null;
    }
}