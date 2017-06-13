package com.artezio.mts;

/**
 * @author  araigorodskiy
 */
import com.artezio.mts.controller.UserRestController;
import com.artezio.mts.model.MyParamConverterProvider;

import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.core.Application;

public class MyRESTApplication  extends Application {

    private Set<Object> singletons = new HashSet<Object>();

    public MyRESTApplication() {
        singletons.add(new UserRestController());
    }

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    @Override
    public Set<Class<?>> getClasses()
    {
        HashSet<Class<?>> set = new HashSet<Class<?>>(1);
        set.add(MyParamConverterProvider.class);
        return set;
    }
}