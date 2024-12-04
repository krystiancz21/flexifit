package com.flexifit.groupclass;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupClassService {
    
    private final GroupClassRepository groupClassRepository;

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
} 