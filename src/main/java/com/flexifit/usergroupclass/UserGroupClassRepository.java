package com.flexifit.usergroupclass;

import com.flexifit.groupclass.GroupClass;
import com.flexifit.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserGroupClassRepository extends JpaRepository<UserGroupClass, Long> {
     boolean existsByUserAndGroupClass(User user, GroupClass groupClass);
     long countByGroupClass(GroupClass groupClass);
}
