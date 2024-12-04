package com.flexifit.groupclass;

import com.flexifit.ticket.Ticket;
import com.flexifit.user.User;
import com.flexifit.user.UserRepository;
import com.flexifit.usergroupclass.UserGroupClass;
import com.flexifit.usergroupclass.UserGroupClassRepository;
import com.flexifit.userticket.UserTicket;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupClassService {
    
    private final GroupClassRepository groupClassRepository;
    private final UserRepository userRepository;
    private final UserGroupClassRepository userGroupClassRepository;

    public GroupClass createGroupClass(GroupClass groupClass) {
        return groupClassRepository.save(groupClass);
    }

    public List<GroupClass> getAllGroupClasses() {
        return groupClassRepository.findAll();
    }

    public Optional<GroupClass> getGroupClassById(Long id) {
        return groupClassRepository.findById(id);
    }

    public Optional<GroupClass> updateGroupClass(Long id, GroupClass groupClassDetails) {
        return groupClassRepository.findById(id)
                .map(groupClass -> {
                    groupClass.setName(groupClassDetails.getName());
                    groupClass.setDescription(groupClassDetails.getDescription());
                    groupClass.setActivityDay(groupClassDetails.getActivityDay());
                    groupClass.setCapacity(groupClassDetails.getCapacity());
                    return groupClassRepository.save(groupClass);
                });
    }

    public boolean deleteGroupClass(Long id) {
        if (groupClassRepository.existsById(id)) {
            groupClassRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public GroupClass buyGroupClass(Long classId, Long userId) {
        GroupClass groupClass = groupClassRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("Group class not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (userGroupClassRepository.existsByUserAndGroupClass(user, groupClass)) {
            throw new IllegalArgumentException("User is already enrolled in this class");
        }

        long currentParticipants = userGroupClassRepository.countByGroupClass(groupClass);
        if (currentParticipants >= groupClass.getCapacity()) {
            throw new IllegalArgumentException("No available spots in the class");
        }

        groupClass.setCapacity(groupClass.getCapacity() - 1);
        groupClassRepository.save(groupClass);

        UserGroupClass userGroupClass = UserGroupClass.builder()
                .user(user)
                .groupClass(groupClass)
                .build();

        userGroupClassRepository.save(userGroupClass);
        return groupClass;
    }
}