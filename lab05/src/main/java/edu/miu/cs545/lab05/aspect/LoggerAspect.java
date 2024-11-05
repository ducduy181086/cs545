package edu.miu.cs545.lab05.aspect;

import edu.miu.cs545.lab05.entity.Logger;
import edu.miu.cs545.lab05.repository.ExceptionRepo;
import edu.miu.cs545.lab05.repository.LoggerRepo;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
@RequiredArgsConstructor
public class LoggerAspect {
    private final LoggerRepo loggerRepo;
    private final ExceptionRepo exceptionRepo;

    @Pointcut("execution(* edu.miu.cs545.lab05.controller..*(..)) || " +
            "execution(* edu.miu.cs545.lab05.service..*(..))")
    public void logMe() { }

    @Before("logMe()")
    public void logMeBefore(JoinPoint joinPoint) {
        LocalDateTime dateTime = LocalDateTime.now();
        String principle = "guest"; // TODO: will do this in next lab.
        String operation = joinPoint.getSignature().getName();
        loggerRepo.save(new Logger(0, dateTime, principle, operation));
    }

    @AfterThrowing(value = "logMe()", throwing = "ex")
    public void logMeAfterThrowing(JoinPoint joinPoint, Throwable ex) {
        LocalDateTime dateTime = LocalDateTime.now();
        String principle = "guest"; // TODO: will do this in next lab.
        String operation = joinPoint.getSignature().getName();
        String exception_type = ex.getClass().getName();
        exceptionRepo.save(new edu.miu.cs545.lab05.entity.Exception(0, dateTime, principle, operation, exception_type));
    }
}
