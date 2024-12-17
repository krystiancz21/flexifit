package com.flexifit.usergroupclass;

import com.flexifit.groupclass.GroupClass;
import com.flexifit.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserGroupClassRepository extends JpaRepository<UserGroupClass, Long> {
    List<UserGroupClass> findByUser(User user);
    boolean existsByUserAndGroupClass(User user, GroupClass groupClass);
    long countByGroupClass(GroupClass groupClass);
    Optional<UserGroupClass> findByUserAndGroupClass(User user, GroupClass groupClass);
}
